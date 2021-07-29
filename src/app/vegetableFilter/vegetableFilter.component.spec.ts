import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';
import {VegetableFilter} from './vegetableFilter.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";

describe('VegetableFilter', () => {
  let appInput;
  let filteredVegetables;
  let noResult;

  const pushValue = async (value, fixture) => {
    appInput.value = value;
    appInput.dispatchEvent(new Event('change'));
    appInput.dispatchEvent(new Event('input'));
    await fixture.whenStable();
  };

  const getByTestId = (testId: string, compiled) => {
    return compiled.querySelector(`[data-test-id="${testId}"]`);
  };

  const vegetables = ["Acorn squash","Anise", "Artichoke", "Arugula", "Asparagus", "Banana squash", "Basil", "Bean sprouts", "Beet greens", "Beetroot", "Black beans", "Black-eyed peas", "Bok choy", "Borlotti bean", "Broad beans", "Broccoflower", "Broccoli", "Brussels sprouts", "Butternut squash", "Cabbage", "Calabrese", "Caraway", "Carrot", "Cauliflower", "Cayenne pepper", "Celeriac", "Celery", "Chamomile", "Chard", "Chickpeas", "Chili pepper", "Chives", "Cilantro seeds are Coriander", "Collard greens", "Corn salad", "Courgette", "Cucumber", "Daikon", "Delicata", "Dill", "Endive", "Fennel", "Fennel", "Fiddleheads", "Frisee", "Garlic", "Gem squash", "Ginger", "Green beans", "Green pepper and Red pepper", "Habanero", "Herbs and spices", "Horseradish", "Hubbard squash", "Jalapeño", "Jerusalem artichoke", "Jicama", "Kale", "Kidney beans", "Kohlrabi", "Lavender", "Leek Allium porrum", "Lemon Grass", "Lentils", "Lettuce Lactuca sativa", "Lima beans or Butter bean", "Maize", "Mangel-wurzel", "Marjoram", "Marrow", "Mung beans", "Mushrooms", "Mustard greens", "Navy beans", "Nettles", "New Zealand spinach", "Okra", "Onion", "Onion family", "Oregano", "Paprika", "Parsley", "Parsnip", "Patty pans", "Peas", "Peppers", "Pinto beans", "Potato", "Pumpkin", "Quandon", "Radicchio", "Radish", "Rhubarb", "Root vegetables", "Rosemary", "Runner beans", "Rutabaga", "Sage", "Salsify (usually Purple Salsify or Oyster Plant)", "Shallot", "Skirret", "Soy beans", "Spaghetti squash", "Spinach", "Split peas", "Spring onion", "Squashes", "Sunchokes", "Swede", "Sweet potato", "Tabasco pepper", "Taro", "Tat soi", "Thyme", "Topinambur", "Tubers", "Turnip", "Turnip", "Turnip greens", "Wasabi", "Water chestnut", "Watercress", "White radish", "Yam"];

  const factory = (vegetables) => {
    const fixture: ComponentFixture<VegetableFilter> = TestBed.createComponent(VegetableFilter);
    const component: VegetableFilter = fixture.componentInstance;
    component.vegetables = vegetables;
    const compiled = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    return {
      fixture,
      component,
      compiled
    };
  };

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        imports: [
          RouterTestingModule,
          FormsModule
        ],
        declarations: [VegetableFilter],
        schemas : [CUSTOM_ELEMENTS_SCHEMA]
      })
      .compileComponents();
  }));

  it('Initial UI is rendered as expected', async () => {
    const {compiled, fixture} = factory(vegetables);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);
    filteredVegetables = getByTestId('filtered-vegetables', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(appInput.textContent.trim()).toBeFalsy();
    expect(filteredVegetables.children.length).toEqual(vegetables.length);
    vegetables.forEach((item, index) => {
      expect(filteredVegetables.children[index].textContent.trim()).toEqual(item);
    })
    expect(noResult).toBeFalsy();
  });

  it('Filtering with a vegetable name that does not exist shows No Results Found', async () => {
    const {compiled, fixture} = factory(vegetables);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('abcdefgh', fixture);
    await fixture.detectChanges();

    filteredVegetables = getByTestId('filtered-vegetables', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredVegetables).toBeFalsy();
    expect(noResult).toBeTruthy();
    expect(noResult.textContent.trim()).toEqual('No Results Found');
  });

  it('Should display vegetables beginning with the search substring', async () => {
    const {compiled, fixture} = factory(vegetables);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('sprouts', fixture);
    await fixture.detectChanges();

    filteredVegetables = getByTestId('filtered-vegetables', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredVegetables).toBeFalsy();
    expect(noResult).toBeTruthy();
    expect(noResult.textContent.trim()).toEqual('No Results Found');
  });

  it('Filtering works', async () => {
    const {compiled, fixture} = factory(vegetables);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('o', fixture);
    await fixture.detectChanges();

    const expectedResult = [
      "Okra",
      "Onion",
      "Onion family",
      "Oregano",
    ];

    filteredVegetables = getByTestId('filtered-vegetables', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredVegetables).toBeTruthy();
    expect(filteredVegetables.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredVegetables.children[index].textContent.trim()).toEqual(item);
    });
    expect(noResult).toBeFalsy();
  });

  it('Filtering is case insensitive', async () => {
    const {compiled, fixture} = factory(vegetables);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('bR', fixture);
    await fixture.detectChanges();

    let expectedResult = [
      "Broad beans",
      "Broccoflower",
      "Broccoli",
      "Brussels sprouts"
    ];

    filteredVegetables = getByTestId('filtered-vegetables', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredVegetables).toBeTruthy();
    expect(filteredVegetables.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredVegetables.children[index].innerHTML).toEqual(item);
    });
    expect(noResult).toBeFalsy();

    await pushValue('swe', fixture);
    await fixture.detectChanges();

    expectedResult = [
      "Swede",
      "Sweet potato",
    ];

    filteredVegetables = getByTestId('filtered-vegetables', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredVegetables).toBeTruthy();
    expect(filteredVegetables.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredVegetables.children[index].innerHTML).toEqual(item);
    });
    expect(noResult).toBeFalsy();
  });

  it('Sequencing - filter with matching string, then with no matching string, then with matching string', async () => {
    const {compiled, fixture} = factory(vegetables);
    await fixture.whenStable();

    appInput = getByTestId('app-input', compiled);

    await pushValue('ar', fixture);
    await fixture.detectChanges();

    filteredVegetables = getByTestId('filtered-vegetables', compiled);
    noResult = getByTestId('no-result', compiled);

    let expectedResult = [
      "Artichoke",
      "Arugula",
    ];

    expect(filteredVegetables).toBeTruthy();
    expect(filteredVegetables.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredVegetables.children[index].innerHTML).toEqual(item);
    });
    expect(noResult).toBeFalsy();

    await pushValue('Base', fixture);
    await fixture.detectChanges();

    filteredVegetables = getByTestId('filtered-vegetables', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredVegetables).toBeFalsy();
    expect(noResult).toBeTruthy();
    expect(noResult.textContent.trim()).toEqual('No Results Found');

    await pushValue('water', fixture);
    await fixture.detectChanges();

    expectedResult = [
      "Water chestnut",
      "Watercress",
    ];

    filteredVegetables = getByTestId('filtered-vegetables', compiled);
    noResult = getByTestId('no-result', compiled);

    expect(filteredVegetables).toBeTruthy();
    expect(filteredVegetables.children.length).toEqual(expectedResult.length);
    expectedResult.forEach((item, index) => {
      expect(filteredVegetables.children[index].innerHTML).toEqual(item);
    });
    expect(noResult).toBeFalsy();
  });
});
