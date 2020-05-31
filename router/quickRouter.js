import * as RootNavigation from './Router.js';

// Route to Country Details page
export function goToCountryDetails(input) {
    countryName = input;
    RootNavigation.navigate('Country Details', {});
}

// Route to State Details page
export function goToStateDetails(input) {
    stateName = input;
    RootNavigation.navigate('State Details', {});
}
  