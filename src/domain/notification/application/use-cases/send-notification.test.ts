import { InMemoryNotificationRepository } from 'test/repositories/in-memory-notifications-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationRepository: InMemoryNotificationRepository
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationRepository = new InMemoryNotificationRepository()
    sut = new SendNotificationUseCase(inMemoryNotificationRepository)
  })

  it('Should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      content: 'test content',
      title: 'test title',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
