import dayjs from 'dayjs';

export const wait = ms => new Promise(res => setTimeout(res, ms));

export const now = () => Date.now();

export const formatDate = date => dayjs(date).format('DD MMM, hh:mm A');
