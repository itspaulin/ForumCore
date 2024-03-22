import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestioBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let sut: GetQuestioBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    sut = new GetQuestioBySlugUseCase(inMemoryQuestionRepository)
  })

  it('Should be able to get question by slug', async () => {
    const newQuestion = makeQuestion({ slug: Slug.create('my-new-title') })

    await inMemoryQuestionRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'my-new-title',
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
})
