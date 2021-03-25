import { EEventType } from '../../models/Event'
import { enumToArray } from '../enumToArray'

describe('Utils: enumToArray', () => {
  it('should convert enum to array', () => {
    expect(enumToArray(EEventType)).toEqual(['sms_notification', 'email_notification'])
  })
})
