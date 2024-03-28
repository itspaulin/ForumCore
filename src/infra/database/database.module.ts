import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaQuestionsRepository } from './prisma/repositories/prisma-questions-repository'
import { PrismaQuestionsCommentsRepository } from './prisma/repositories/prisma-questions-comments-repository'
import { PrismaQuestionsAttachmentsCommentsRepository } from './prisma/repositories/prisma-questions-attachments-repository'
import { PrismaAnswersRepository } from './prisma/repositories/prisma-answers-repository'
import { PrismaAnswersCommentsRepository } from './prisma/repositories/prisma-answers-comments-repository'
import { PrismaAnswersAttachmentsRepository } from './prisma/repositories/prisma-answer-attachment-repository'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { PrismaStudentRepository } from './prisma/repositories/prisma-students-repository'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { QuestionsCommentRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { QuestionAttachmentRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { AnswersCommentRepository } from '@/domain/forum/application/repositories/answers-comments-repository'
import { AnswerAttachmentRepository } from '@/domain/forum/application/repositories/answer-attachment-repository'
import { AttachmentsRepository } from '@/domain/forum/application/repositories/attachments-repository'
import { PrismaAttachmentsRepository } from './prisma/repositories/prisma-attachment-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: QuestionsRepository,
      useClass: PrismaQuestionsRepository,
    },
    {
      provide: StudentsRepository,
      useClass: PrismaStudentRepository,
    },
    {
      provide: QuestionsCommentRepository,
      useClass: PrismaQuestionsCommentsRepository,
    },
    {
      provide: QuestionAttachmentRepository,
      useClass: PrismaQuestionsAttachmentsCommentsRepository,
    },
    {
      provide: AnswersRepository,
      useClass: PrismaAnswersRepository,
    },
    {
      provide: AnswersCommentRepository,
      useClass: PrismaAnswersCommentsRepository,
    },
    {
      provide: AnswerAttachmentRepository,
      useClass: PrismaAnswersAttachmentsRepository,
    },
    {
      provide: AttachmentsRepository,
      useClass: PrismaAttachmentsRepository,
    },
  ],
  exports: [
    PrismaService,
    StudentsRepository,
    QuestionsRepository,
    QuestionsCommentRepository,
    QuestionAttachmentRepository,
    AnswersRepository,
    AnswersCommentRepository,
    AnswerAttachmentRepository,
    AttachmentsRepository,
  ],
})
export class DatabaseModule {}
