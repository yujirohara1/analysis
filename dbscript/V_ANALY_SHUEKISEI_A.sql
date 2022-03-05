drop view V_ANALY_SHUEKISEI_A; 

create 
or replace view V_ANALY_SHUEKISEI_A as 
select
    nendo
    , gyomu_cd
    , gyoshu_cd
    , jigyo_cd
    , dantai_cd
    , dantai_nm
    , sisetu_cd
    , sisetu_nm
    , hyo_num
    , hyo_num_sub
    , gyo_num
    , gyo_num_sub
    , joken_1
    , joken_2
    , joken_3
    , joken_4
    , joken_5
    , joken_6
    , joken_7
    , joken_8
    , joken_9
    , eigyo_shueki
    , eigyo_gai_shueki
    , (eigyo_shueki + eigyo_gai_shueki) keijo_shueki
    , eigyo_hiyo
    , eigyo_gai_hiyo
    , (eigyo_hiyo + eigyo_gai_hiyo) keijo_hiyo
    , eigyo_shueki - eigyo_hiyo eigyo_soneki
    , (eigyo_shueki + eigyo_gai_shueki) - (eigyo_hiyo + eigyo_gai_hiyo) keijo_soneki
    , round(case 
        when (eigyo_hiyo) = 0 
            then null 
        else ((eigyo_shueki) / (eigyo_hiyo)) * 100 
        end) eigyo_shusi_hiritu
    , round(case 
        when (eigyo_hiyo + eigyo_gai_hiyo) = 0 
            then null 
        else ( 
            (eigyo_shueki + eigyo_gai_shueki) / (eigyo_hiyo + eigyo_gai_hiyo)
        ) * 100 
        end) keijo_shusi_hiritu 
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
            , hyo_num
            , hyo_num_sub
            , gyo_num
            , gyo_num_sub
            , joken_1
            , joken_2
            , joken_3
            , joken_4
            , joken_5
            , joken_6
            , joken_7
            , joken_8
            , joken_9
            , sum(case when retu_num = 2 then val_num else 0 end) eigyo_shueki
            , sum(case when retu_num = 15 then val_num else 0 end) eigyo_gai_shueki
            , sum(case when retu_num = 26 then val_num else 0 end) eigyo_hiyo
            , sum(case when retu_num = 40 then val_num else 0 end) eigyo_gai_hiyo 
        from
            analy_main a 
        where
            hyo_num = 20 
            and gyo_num = 1 
            and retu_num in (2, 15, 26, 40) 
        group by
            nendo
            , gyomu_cd
            , gyoshu_cd
            , jigyo_cd
            , dantai_cd
            , dantai_nm
            , sisetu_cd
            , sisetu_nm
            , hyo_num
            , hyo_num_sub
            , gyo_num
            , gyo_num_sub
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

