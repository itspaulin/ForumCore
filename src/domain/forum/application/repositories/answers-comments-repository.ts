import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comment'

export interface AnswersCommentRepository {
  findById(id: string): Promise<AnswerComment | null>
  findByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  delete(answers: AnswerComment): Promise<void>
  create(answers: AnswerComment): Promise<void>
}
