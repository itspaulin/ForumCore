import { FecthAnswersCommentsUseCase } from './fetch-answer-comments'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let sut: FecthAnswersCommentsUseCase

describe('Fetch answers Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository()
    sut = new FecthAnswersCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('Should be able to fetch  answers comments', async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('Should be able to fetc paginated answers answrs', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.answerComments).toHaveLength(2)
  })
})
