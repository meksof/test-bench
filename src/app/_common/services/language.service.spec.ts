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
          useValue: createSpyFromClass(TranslateService, { methodsToSpyOn: ['getTranslation', 'setTranslation', 'getBrowserCultureLang'] },
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
      languageService.loadLanguageByAppName(null).subscribe(() => done());

      expect(mockGetTranslation.mock.calls.length).toBe(1);
      expect(languageService.loadedLanguages.main).toBe(true);

    });

    it('When language AppName\'s is "bckp" was loaded, loadedLanguages should reflect it', (done) => {
      // ...
      languageService.loadedLanguages.bckp = false;

      // ...
      languageService.loadLanguageByAppName(['bckp']).subscribe(() => done());

      expect(languageService.loadedLanguages.bckp).toBe(true);
    });

    it('When already loaded should not ask for translation anymore', (done) => {
      // ...
      languageService.loadAppLanguage = jest.fn();
      languageService.loadedLanguages.bckp = true;

      // ...
      languageService.loadLanguageByAppName(['bckp']).subscribe(() => done());
      // ...
      expect(languageService.loadAppLanguage).not.toHaveBeenCalled();
    });

    it('When evoked 2 times, METHOD "loadLanguage" Should be fired 2 times', (done) => {
      const mockGetTranslation = jest.spyOn<any, string>(translateService, 'getTranslation');
      combineLatest([
          languageService.loadLanguageByAppName(['bckp']),
          languageService.loadLanguageByAppName(['itsm'])
        ])
      .subscribe(() => {
        done();
      });

      expect(mockGetTranslation.mock.calls.length).toBe(2);
    });
  });
});
