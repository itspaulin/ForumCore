import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentRepository
  implements QuestionAttachmentRepository
{
  public items: QuestionAttachment[] = []

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    const questionAttachment = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.items = questionAttachment
  }

  async findManyByQuestionId(questionId: string) {
    const questionAttachment = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachment
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachment = this.items.filter((item) => {
      return !attachments.some((attachments) => attachments.equals(item))
    })

    this.items = questionAttachment
  }
}
