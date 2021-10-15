import { CurrencyListPipe } from './currency-list.pipe';

describe('ListPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyListPipe();
    expect(pipe).toBeTruthy();
  });
});
