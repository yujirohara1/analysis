drop view V_ANALY_HYO; 

create 
or replace view V_ANALY_HYO as 
select
    a.gyomu_cd,
    a.gyoshu_cd,
    a.jigyo_cd,
    a.dantai_cd,
    a.sisetu_cd,
    a.hyo_num,
    a.gyo_num,
    a.retu_num,
    b.indent,
    coalesce(c.name1,b.name1) name1,
    sum(case when a.nendo = 2015 then val_num else 0 end) val_a,
    sum(case when a.nendo = 2016 then val_num else 0 end) val_b,
    sum(case when a.nendo = 2017 then val_num else 0 end) val_c,
    sum(case when a.nendo = 2018 then val_num else 0 end) val_d,
    sum(case when a.nendo = 2019 then val_num else 0 end) val_e,
    sum(case when a.nendo = 2020 then val_num else 0 end) val_f,
    sum(case when a.nendo = 2021 then val_num else 0 end) val_g,
    sum(case when a.nendo = 2022 then val_num else 0 end) val_h,
    sum(case when a.nendo = 2023 then val_num else 0 end) val_i,
    sum(case when a.nendo = 2024 then val_num else 0 end) val_j
from
    analy_main a
join
    (select * from analy_gyoretu where gyomu_cd = '0') b
on
    a.nendo = b.nendo and
    a.hyo_num = b.hyo_num and
    a.gyo_num = b.gyo_num and
    a.retu_num = b.retu_num 
left join
    (select * from analy_gyoretu where gyomu_cd <> '0') c
on
    a.nendo = c.nendo and
    a.gyomu_cd = c.gyomu_cd and
    a.gyoshu_cd = c.gyoshu_cd and
    a.jigyo_cd = c.jigyo_cd and
    a.hyo_num = c.hyo_num and
    a.gyo_num = c.gyo_num and
    a.retu_num = c.retu_num 
where
    coalesce(coalesce(c.name1,b.name1),'') <> ''
group by
    a.gyomu_cd,
    a.gyoshu_cd,
    a.jigyo_cd,
    a.dantai_cd,
    a.sisetu_cd,
    a.hyo_num,
    a.gyo_num,
    a.retu_num,
    b.indent,
    coalesce(c.name1,b.name1)
order by
    a.gyo_num
    , a.retu_num;

