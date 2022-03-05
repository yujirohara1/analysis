drop view V_ANALY_RUISEKI_KESSON_A; 

create 
or replace view V_ANALY_RUISEKI_KESSON_A as 
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
    , round(case 
        when (eigyo_shueki - jutaku_koji_shueki) <= 0 
            then null 
        else ((mishori_kesson) / (eigyo_shueki - jutaku_koji_shueki)) * 100 
        end) ruiseki_kesson_hiritu
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
            , sum(case when hyo_num = 20 and gyo_num = 1 and retu_num = 2  then val_num else 0 end) eigyo_shueki
            , sum(case when hyo_num = 20 and gyo_num = 1 and retu_num = 11 then val_num else 0 end) jutaku_koji_shueki
            , sum(case when hyo_num = 22 and gyo_num = 1 and retu_num = 64 then val_num else 0 end) mishori_kesson
            , sum(case when retu_num = 31 then val_num else 0 end) ryudo_fusai
        from
            analy_main a 
        where
            (hyo_num = 22 and gyo_num = 1 and retu_num = 64)  or
            (hyo_num = 20 and gyo_num = 1 and retu_num in (2,11))  
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

