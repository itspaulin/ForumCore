import { Either, right } from '@/core/either'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FecthQuestionsAnswersUseCaseRequest {
  questionId: string
  page: number
}

type FecthQuestionsAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FecthQuestionsAnswersUseCase {
  constructor(private readonly answersRepository: AnswersRepository) {}

  async execute({
    page,
    questionId,
  }: FecthQuestionsAnswersUseCaseRequest): Promise<FecthQuestionsAnswersUseCaseResponse> {
    const answers = await this.answersRepository.findManyByQuestionId(
      questionId,
      { page },
    )

    return right({
      answers,
    })
  }
}
