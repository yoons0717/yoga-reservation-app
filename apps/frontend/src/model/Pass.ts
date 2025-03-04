export interface Pass {
  _id?: string;
  type: '30일' | '60일' | '90일';
  passCount: number;
  usedPasses: number;
  passStartDate: string; // ISO 문자열 또는 Date 타입 사용 가능
  passEndDate: string; // ISO 문자열 또는 Date 타입 사용 가능
  createdAt?: string;
}
