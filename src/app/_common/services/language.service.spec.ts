import { TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';

import { combineLatest, of } from 'rxjs';

import { Spy, createSpyFromClass } from 'jest-auto-spies';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  let languageService: LanguageService;
  let translateService: Spy<TranslateService>;


  let actualResult: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      providers: [
        LanguageService,
        {
          provide: TranslateService,
          useValue: createSpyFromClass(TranslateService, { methodsToSpyOn: ['getTranslation', 'getBrowserCultureLang'] },
          )
        }
      ]
    });

    translateService = TestBed.get<TranslateService>(TranslateService);
    translateService.getBrowserCultureLang.mockReturnValue('en');
    translateService.getTranslation.mockImplementation(() => of({'Main': 'TRANS'}));
    languageService = TestBed.get<LanguageService>(LanguageService);


    actualResult = undefined;

  });

  describe('METHOD: loadLanguageByAppName', () => {
    it('load main language file', (done) => {
      // ...
      const mockGetTranslation = jest.spyOn<any, string>(translateService, 'getTranslation');
      languageService.loadedLanguages.main = false;

      // ...
      languageService.loadLanguage().subscribe(() => done());

      expect(mockGetTranslation.mock.calls.length).toBe(1);
      expect(languageService.loadedLanguages.main).toBe(true);

    });

    it('When language AppName\'s is "bckp" was loaded, loadedLanguages should reflect it', (done) => {
      // ...
      languageService.loadedLanguages.bckp = false;

      // ...
      languageService.loadLanguage('bckp').subscribe(() => done());

      expect(languageService.loadedLanguages.bckp).toBe(true);
    });

    it('When evoked 2 times, "getTranslation" Should be fired 2 times', (done) => {
      const mockGetTranslation = jest.spyOn<any, string>(translateService, 'getTranslation');
      combineLatest([
          languageService.loadLanguage(['bckp']),
          languageService.loadLanguage(['itsm'])
        ])
      .subscribe(() => {
        done();
      });

      expect(mockGetTranslation.mock.calls.length).toBe(2);
    });

    it('When called  with an array of appNames, getTranslation Should be fired 2 times', (done) => {
      const mockGetTranslation = jest.spyOn<any, string>(translateService, 'getTranslation');

      languageService.loadLanguage(['bckp', 'itsm'])
        .subscribe(() => {
          done();
        });

      expect(mockGetTranslation.mock.calls.length).toBe(2);
    });

    it('When already loaded should not ask for translation anymore', (done) => {
      // ...
      const mockGetTranslation = jest.spyOn<any, string>(translateService, 'getTranslation');
      languageService.loadedLanguages.main = true;

      // ...
      languageService.loadLanguage().subscribe(() => done());
      // ...
      expect(mockGetTranslation).not.toHaveBeenCalled();
    });
  });
});
