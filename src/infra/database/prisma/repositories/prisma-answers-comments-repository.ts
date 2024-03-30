import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersCommentRepository } from '@/domain/forum/application/repositories/answers-comments-repository'
import { Injectable } from '@nestjs/common'
import { PrismaAnswerCommentMapper } from '../mappers/prisma-answer-comment-mapper'
import { PrismaService } from '../prisma.service'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'
import { PrismCommentWithAuthorMapper } from '../mappers/prisma-comment-with-author-mapper'

@Injectable()
export class PrismaAnswersCommentsRepository
  implements AnswersCommentRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(answercomment: AnswerComment): Promise<void> {
    const data = PrismaAnswerCommentMapper.toPrisma(answercomment)

    await this.prisma.comment.create({
      data,
    })
  }

  async delete(answercomment: AnswerComment): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        id: answercomment.id.toString(),
      },
    })
  }

  async findById(id: string): Promise<AnswerComment | null> {
    const answercomment = await this.prisma.comment.findUnique({
      where: {
        id,
      },
    })

    if (!answercomment) {
      return null
    }

    return PrismaAnswerCommentMapper.toDomain(answercomment)
  }

  async findByAnswerId(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const questions = await this.prisma.comment.findMany({
      where: { answerId },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaAnswerCommentMapper.toDomain)
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ): Promise<CommentWithAuthor[]> {
    const answerComments = await this.prisma.comment.findMany({
      where: { answerId },
      include: { author: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
      skip: (page - 1) * 20,
    })

    return answerComments.map(PrismCommentWithAuthorMapper.toDomain)
  }
}
