import {
  DateRangePicker,
  DateRangePickerItem,
  DateRangePickerValue
} from '@tremor/react';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';

export default function DateRange() {
  const today = new Date();
  const firstDayMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const [value, setValue] = useState<DateRangePickerValue>({
    from: firstDayMonth,
    to: today
  });

  return (
    <DateRangePicker
      value={value}
      onValueChange={setValue}
      locale={ptBR}
      placeholder="Selecione um período"
      selectPlaceholder="Selecionar"
      color="rose"
    >
      <DateRangePickerItem key="today" value="today" from={today}>
        Hoje
      </DateRangePickerItem>
      <DateRangePickerItem
        key="sevenDays"
        value="sevenDays"
        from={
          new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
        }
        to={today}
      >
        Últimos 7 dias
      </DateRangePickerItem>
      <DateRangePickerItem
        key="thirtyDays"
        value="thirtyDays"
        from={
          new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)
        }
        to={today}
      >
        Últimos 30 dias
      </DateRangePickerItem>
      <DateRangePickerItem
        key="month"
        value="month"
        from={firstDayMonth}
        to={today}
      >
        Esse mês
      </DateRangePickerItem>
      <DateRangePickerItem
        key="year"
        value="year"
        from={new Date(today.getFullYear(), 0, 1)}
        to={today}
      >
        Esse Ano
      </DateRangePickerItem>
    </DateRangePicker>
  );
}
