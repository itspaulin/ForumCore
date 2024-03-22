import { FecthQuestionsCommentsUseCase } from './fetch-question-comments'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryQuestionCommentRepository } from 'test/repositories/in-memory-question-comments-repository'
import { makeQuestionComment } from 'test/factories/make-question-comment'

let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository
let sut: FecthQuestionsCommentsUseCase

describe('Fetch questions Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository = new InMemoryQuestionCommentRepository()
    sut = new FecthQuestionsCommentsUseCase(inMemoryQuestionCommentRepository)
  })

  it('Should be able to fetch  questions comments', async () => {
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )
    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )

    await inMemoryQuestionCommentRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )

    const result = await sut.execute({
      questionId: 'question-1',
      page: 1,
    })

    expect(result.value?.questionComments).toHaveLength(3)
  })

  it('Should be able to fetc paginated questions answrs', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const result = await sut.execute({
      questionId: 'question-1',
      page: 2,
    })

    expect(result.value?.questionComments).toHaveLength(2)
  })
})
