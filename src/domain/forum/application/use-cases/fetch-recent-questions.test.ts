import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { FetchRecentsQuestionsUseCase } from './fetch-recent-questions'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: FetchRecentsQuestionsUseCase

describe('Fetch recent questions', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new FetchRecentsQuestionsUseCase(inMemoryQuestionRepository)
  })

  it('Should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 18) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 19) }),
    )
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2022, 0, 20) }),
    )

    const result = await sut.execute({
      page: 1,
    })

    expect(result.value?.questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2022, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 19) }),
      expect.objectContaining({ createdAt: new Date(2022, 0, 18) }),
    ])
  })

  it('Should be able to fetc paginated recent questions', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion())
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result.value?.questions).toHaveLength(2)
  })
})
