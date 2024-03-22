import { AnswersRepository } from '../repositories/answers-repository'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswersCommentRepository } from '../repositories/answers-comments-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Either, left, right } from '@/core/either'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

interface CommentOnAnswersUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private readonly answersRepository: AnswersRepository,
    private readonly answersCommentRepository: AnswersCommentRepository,
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswersUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }
    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    })
    await this.answersCommentRepository.create(answerComment)

    return right({
      answerComment,
    })
  }
}
