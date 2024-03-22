import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachment-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentRepository
  implements AnswerAttachmentRepository
{
  public items: AnswerAttachment[] = []

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    const answerAttachment = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = answerAttachment
  }

  async findManyByAnswerId(answerId: string) {
    const answerAttachment = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachment
  }
}
