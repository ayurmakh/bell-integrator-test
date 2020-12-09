<template>
  <div class="history">
    <h1>{{ `История ${historyMode === 'add' ? 'добавлений' : historyMode === 'delete' ? 'удалений' : ''}` }}</h1>
    <div class="history__list">
      <table>
        <thead>
          <tr class="border-bottom">
            <td>Страна</td>
            <td>Режим</td>
            <td>Дата</td>
          </tr>
        </thead>
        <tbody>
          <tr
            class="border-bottom"
            v-for="(item, i) of getHistory(historyMode)"
            :key="i">
            <td>{{ item.country.name }}</td>
            <td>{{ getTranslatedMode(item.mode) }}</td>
            <td>{{ getFormattedDate(item.date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { HistoryItem } from '@/types';
import Vue from 'vue'
import Component from 'vue-class-component';
import { Getter } from 'vuex-class';
import { modes } from '@/constants';

@Component
export default class History extends Vue {

  @Getter
  private getHistory!: (mode: string) => HistoryItem[];

  private getTranslatedMode(mode: string) {
    return mode === modes.add ? 'Добавление' : 'Удаление';
  }

  private getFormattedDate(date: Date) {
    const moment = require('moment');
    return moment(date).format('DD.MM.YYYY HH:mm:ss');
  }

  get historyMode() {
    return this.$route.path.split('/')[2] || '';
  }
}
</script>

<style lang="scss">
td {
  padding: 10px;
}
</style>