import { ExistenciasModule } from './existencias.module';

describe('ExistenciasModule', () => {
  let existenciasModule: ExistenciasModule;

  beforeEach(() => {
    existenciasModule = new ExistenciasModule();
  });

  it('should create an instance', () => {
    expect(existenciasModule).toBeTruthy();
  });
});
