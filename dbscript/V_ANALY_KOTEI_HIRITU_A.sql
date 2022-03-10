drop view V_ANALY_KOTEI_HIRITU_A;

create 
or replace view V_ANALY_KOTEI_HIRITU_A as 
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
    , kotei_sisan
    , sihon
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
    ) a;

