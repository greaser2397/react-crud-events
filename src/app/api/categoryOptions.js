import i18n from '../../i18n/config';

export const getCategoryData = () => {
  return [
    { key: 'drinks', text: i18n.t('category.drinks', { defaultValue: 'Drinks' }) || 'Drinks', value: 'drinks' },
    { key: 'culture', text: i18n.t('category.culture', { defaultValue: 'Culture' }) || 'Culture', value: 'culture' },
    { key: 'film', text: i18n.t('category.film', { defaultValue: 'Film' }) || 'Film', value: 'film' },
    { key: 'food', text: i18n.t('category.food', { defaultValue: 'Food' }) || 'Food', value: 'food' },
    { key: 'music', text: i18n.t('category.music', { defaultValue: 'Music' }) || 'Music', value: 'music' },
    { key: 'travel', text: i18n.t('category.travel', { defaultValue: 'Travel' }) || 'Travel', value: 'travel' },
  ];
};