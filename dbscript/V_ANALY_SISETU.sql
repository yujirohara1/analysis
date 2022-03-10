drop view V_ANALY_SISETU; 

create 
or replace view V_ANALY_SISETU as 
select
    max(nendo) nendo
    , gyomu_cd
    , gyoshu_cd
    , jigyo_cd
    , lpad(trim(dantai_cd),6,'0') dantai_cd
    , min(dantai_nm) dantai_nm
    , sisetu_cd
    , min(sisetu_nm) sisetu_nm
from
    analy_main
where
    nendo = 2020 and
    hyo_num = 20 and
    gyo_num = 1 and
    retu_num = 10
group by
     gyomu_cd
    , gyoshu_cd
    , jigyo_cd
    , dantai_cd
    , sisetu_cd
;



select * from V_ANALY_SISETU;
