drop view V_ANALY_RETURN_ON_EQUITY_A;

create 
or replace view V_ANALY_RETURN_ON_EQUITY_A as 
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
    , sihon_kei
    , sisan_kei
    , (eigyo_shueki + eigyo_gai_shueki) - (eigyo_hiyo + eigyo_gai_hiyo) keijo_shushi
    , round(case 
        when (sihon_kei) <= 0 
            then null 
        else ((  (eigyo_shueki + eigyo_gai_shueki) - (eigyo_hiyo + eigyo_gai_hiyo)  ) / (sihon_kei)) * 100 
        end) roe
    , round(case 
        when (sisan_kei) <= 0 
            then null 
        else ((  (eigyo_shueki + eigyo_gai_shueki) - (eigyo_hiyo + eigyo_gai_hiyo)  ) / (sisan_kei)) * 100 
        end) roa
    , round(case 
        when (sisan_kei) <= 0 
            then null 
        else ((sihon_kei) / (sisan_kei)) * 100 
        end) sihon_hiritu
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
            , sum(case when hyo_num = 22 and gyo_num = 1 and retu_num = 68  then val_num else 0 end) sihon_kei
            , sum(case when hyo_num = 22 and gyo_num = 1 and retu_num = 21  then val_num else 0 end) sisan_kei
            , sum(case when retu_num = 2 then val_num else 0 end) eigyo_shueki
            , sum(case when retu_num = 15 then val_num else 0 end) eigyo_gai_shueki
            , sum(case when retu_num = 26 then val_num else 0 end) eigyo_hiyo
            , sum(case when retu_num = 40 then val_num else 0 end) eigyo_gai_hiyo 
        from
            analy_main a 
        where
            (hyo_num = 22 and gyo_num = 1 and retu_num in (68,21)) or
            (hyo_num = 20 and gyo_num = 1 and retu_num in (2, 15, 26, 40))
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

