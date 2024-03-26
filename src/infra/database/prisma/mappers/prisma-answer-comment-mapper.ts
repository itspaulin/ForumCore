import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { Comment as PrismaComment, Prisma } from '@prisma/client'

export class PrismaAnswerCommentMapper {
  static toDomain(raw: PrismaComment): AnswerComment {
    if (!raw.answerId) {
      throw new Error('Invalid comment type.')
    }

    return AnswerComment.create(
      {
        authorId: new UniqueEntityId(raw.authorId),
        answerId: new UniqueEntityId(raw.answerId),
        content: raw.content,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      new UniqueEntityId(raw.id),
    )
  }

  static toPrisma(
    AnswerComment: AnswerComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: AnswerComment.id.toString(),
      authorId: AnswerComment.authorId.toString(),
      answerId: AnswerComment.answerId.toString(),
      content: AnswerComment.content,
      createdAt: AnswerComment.createdAt,
      updatedAt: AnswerComment.updatedAt,
    }
  }
}
