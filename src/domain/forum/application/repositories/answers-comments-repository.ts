import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export abstract class AnswersCommentRepository {
  abstract findById(id: string): Promise<AnswerComment | null>
  abstract findByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>

  abstract delete(answers: AnswerComment): Promise<void>
  abstract create(answers: AnswerComment): Promise<void>
}
