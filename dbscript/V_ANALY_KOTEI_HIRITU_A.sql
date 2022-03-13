drop view V_ANALY_KOTEI_HIRITU_A;

create 
or replace view V_ANALY_KOTEI_HIRITU_A as 
select
    a.nendo
    , a.gyomu_cd
    , a.gyoshu_cd
    , a.jigyo_cd
    , a.dantai_cd
    , a.dantai_nm
    , a.sisetu_cd
    , case when a.sisetu_nm = 'NaN' then b.jigyo_nm else a.sisetu_nm end 
    , a.joken_1
    , a.joken_2
    , a.joken_3
    , a.joken_4
    , a.joken_5
    , a.joken_6
    , a.joken_7
    , a.joken_8
    , a.joken_9
    , a.kotei_sisan
    , a.sihon
    , round(case 
        when (sihon) <= 0 
            then null 
        else ((kotei_sisan) / (sihon)) * 100 
        end) kotei_hiritu
from
    ( 
        select
            nendo
            , gyomu_cd
            , gyoshu_cd
            , jigyo_cd
            , dantai_cd
            , dantai_nm
            , sisetu_cd
            , sisetu_nm
            , joken_1
            , joken_2
            , joken_3
            , joken_4
            , joken_5
            , joken_6
            , joken_7
            , joken_8
            , joken_9
            , sum(case when hyo_num = 22 and gyo_num = 1 and retu_num = 1  then val_num else 0 end) kotei_sisan
            , sum(case when hyo_num = 22 and gyo_num = 1 and retu_num = 68  then val_num else 0 end) sihon
        from
            analy_main a 
        where
            hyo_num = 22 and gyo_num = 1 and retu_num in (1,68)
        group by
            nendo
            , gyomu_cd
            , gyoshu_cd
            , jigyo_cd
            , dantai_cd
            , dantai_nm
            , sisetu_cd
            , sisetu_nm
            , joken_1
            , joken_2
            , joken_3
            , joken_4
            , joken_5
            , joken_6
            , joken_7
            , joken_8
            , joken_9
    ) a
    join analy_jigyo b
on
    a.nendo = b.nendo and
    a.gyoshu_cd = b.gyoshu_cd and
    a.jigyo_cd = b.jigyo_cd
;
