import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswerCommentRepository } from 'test/repositories/in-memory-answers-comments-repository'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryStudentRepository } from 'test/repositories/in-memory-students-repository'
import { makeStudent } from 'test/factories/make-student'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository
let inMemoryStudentsRepository: InMemoryStudentRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch answers Comments', () => {
  beforeEach(() => {
    inMemoryStudentsRepository = new InMemoryStudentRepository()
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentRepository(
      inMemoryStudentsRepository,
    )
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('Should be able to fetch  answers comments', async () => {
    const student = makeStudent({
      name: 'John Doe',
    })

    inMemoryStudentsRepository.items.push(student)

    const answer1 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      authorId: student.id,
    })

    const answer2 = makeAnswerComment({
      answerId: new UniqueEntityId('answer-1'),
      authorId: student.id,
    })

    await inMemoryAnswerCommentRepository.create(answer1)
    await inMemoryAnswerCommentRepository.create(answer2)

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(result.value?.comments).toHaveLength(2)
    expect(result.value?.comments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          author: 'John Doe',
          commentId: answer1.id,
        }),
        expect.objectContaining({
          author: 'John Doe',
          commentId: answer2.id,
        }),
      ]),
    )
  })

  it('Should be able to fetch paginated answers comments', async () => {
    const student = makeStudent({
      name: 'John Doe',
    })

    inMemoryStudentsRepository.items.push(student)

    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
          authorId: student.id,
        }),
      )
    }

    const result = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(result.value?.comments).toHaveLength(2)
  })
})
