import { Optional } from '@/core/@types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerAttachmentList } from './answer-attachment-list'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { AnswerCreatedEvent } from './events/answer-created-events'

export interface AnswerProps {
  content: string
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  attachments: AnswerAttachmentList
  createdAt: Date
  updatedAt?: Date | null
}

export class Answer extends AggregateRoot<AnswerProps> {
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get attachments() {
    return this.props.attachments
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get except() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: AnswerAttachmentList) {
    this.props.attachments = attachments
    this.touch()
  }

  static create(
    props: Optional<AnswerProps, 'createdAt' | 'attachments'>,
    id?: UniqueEntityId,
  ) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        attachments: props.attachments ?? new AnswerAttachmentList(),
      },
      id,
    )

    const isNewAnswer = !id

    if (isNewAnswer) {
      answer.addDomainEvents(new AnswerCreatedEvent(answer))
    }

    return answer
  }
}
