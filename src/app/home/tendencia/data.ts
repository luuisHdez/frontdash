
// select array_to_json(array_agg(row_to_json(data)))
//   from(
//     select t1.name_dept,(select array_to_json(array_agg(row_to_json(datita)))
//     from(select sum(t2.total_price)
//     from prueba t2) as datita)
//     from prueba t1
//     where date(t1._date) >= '2020-01-01' and date(t1_date) <= '2020-02-28') data