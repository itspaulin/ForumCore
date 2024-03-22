import { makeAnswer } from 'test/factories/make-answer'
import { OnAnswerCreated } from './on-answer-created'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentRepository } from 'test/repositories/in-memory-answers-attachments-repository'
import { InMemoryQuestionRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentRepository } from 'test/repositories/in-memory-question-attachments-repository'
import {
  SendNotificationUseCase,
  SendNotificationUseCaseRequest,
  SendNotificationUseCaseResponse,
} from '../use-cases/send-notification'
import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository'
import { makeQuestion } from 'test/factories/make-question'
import { MockInstance } from 'vitest'
import { waitFor } from 'test/utils/wait-for'

let inMemoryQuestionRepository: InMemoryQuestionRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentRepository
let inMemoryAnswerAttachmentRepository: InMemoryAnswerAttachmentRepository
let inMemoryNotificationRepository: InMemoryNotificationRepository
let sendNotificationsUseCase: SendNotificationUseCase
let sendNotificationsExecuteSpy: MockInstance<
  [SendNotificationUseCaseRequest],
  Promise<SendNotificationUseCaseResponse>
>

describe('On answer created', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentRepository =
      new InMemoryAnswerAttachmentRepository()
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentRepository()

    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepository(
      inMemoryQuestionAttachmentRepository,
    )
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentRepository,
    )
    sendNotificationsUseCase = new SendNotificationUseCase(
      inMemoryNotificationRepository,
    )

    sendNotificationsExecuteSpy = vi.spyOn(sendNotificationsUseCase, 'execute')

    new OnAnswerCreated(inMemoryQuestionRepository, sendNotificationsUseCase)
  })

  it('Should send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionId: question.id,
    })

    inMemoryQuestionRepository.create(question)
    inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationsExecuteSpy).toHaveBeenCalled()
    })
  })
})
