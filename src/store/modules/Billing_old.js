import { getField, updateField } from 'vuex-map-fields';
// import axios from 'axios';

const state = {
  all_cards: {
    cards: [
      {
        id: 1,
        name: 'Name Surname',
        type: {
          type_name: 'MasterCard',
          type_logo: 'mastercard.svg',
        },
        expires: '12/22',
        ultimo_cifre: '1234'
      },
      {
        id: 2,
        name: 'Name2 Surname2',
        type: {
          type_name: 'Visa',
          type_logo: 'visa.svg',
        },
        expires: '06/24',
        ultimo_cifre: '4321'
      }
    ],
  },
  transactions: [
    {
      id: 1,
      reference: '#23456433324',
      status: 'Pending',
      amount: '+$499',
      date: '22/01/2022'
    },
    {
      id: 2,
      reference: '#23456433324',
      status: 'Completed',
      amount: '-$300',
      date: '22/01/2022'
    },
    {
      id: 3,
      reference: '#23456433324',
      status: 'Failed',
      amount: '+$1100',
      date: '22/01/2022'
    },
    {
      id: 4,
      reference: '#23456433324',
      status: 'pending',
      amount: '+$500',
      date: '22/01/2022'
    },
  ],
  new_card: {
    id: null,
    card_number: '',
    expire_date: '',
    cvc: '',
    cardholder: ''
  }
};

const getters = {
  getField,
};

const actions = {
};

const mutations = {
  updateField,
  // commitAddCard({state}) {
  //   state
  //   state.cards.push()
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
