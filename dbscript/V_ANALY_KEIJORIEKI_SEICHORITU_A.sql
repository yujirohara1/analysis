drop view V_ANALY_KEIJORIEKI_SEICHORITU_A; 

create 
or replace view V_ANALY_KEIJORIEKI_SEICHORITU_A as 
select
    a.nendo
    , a.gyomu_cd
    , a.gyoshu_cd
    , a.jigyo_cd
    , a.dantai_cd
    , a.dantai_nm
    , a.sisetu_cd
    , case 
        when a.sisetu_nm = 'NaN' 
            then c.jigyo_nm 
        else a.sisetu_nm 
        end
    , a.joken_1
    , a.joken_2
    , a.joken_3
    , a.joken_4
    , a.joken_5
    , a.joken_6
    , a.joken_7
    , a.joken_8
    , a.joken_9
    , (a.eigyo_shueki + a.eigyo_gai_shueki) - (a.eigyo_hiyo + a.eigyo_gai_hiyo) keijo_soneki_toki
    , (b.eigyo_shueki + b.eigyo_gai_shueki) - (b.eigyo_hiyo + b.eigyo_gai_hiyo) keijo_soneki_zenki
    , round( 
        case 
            when ( 
                (b.eigyo_shueki + b.eigyo_gai_shueki) - (b.eigyo_hiyo + b.eigyo_gai_hiyo)
            ) = 0 
                then null 
            else ( 
                ( 
                    ( 
                        (a.eigyo_shueki + a.eigyo_gai_shueki) - (a.eigyo_hiyo + a.eigyo_gai_hiyo)
                    ) - ( 
                        (b.eigyo_shueki + b.eigyo_gai_shueki) - (b.eigyo_hiyo + b.eigyo_gai_hiyo)
                    )
                ) / ( 
                    (b.eigyo_shueki + b.eigyo_gai_shueki) - (b.eigyo_hiyo + b.eigyo_gai_hiyo)
                )
            ) * 100 
            end
    ) seicho_ritu 
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
    left join ( 
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
            , joken_1
            , joken_2
            , joken_3
            , joken_4
            , joken_5
            , joken_6
            , joken_7
            , joken_8
            , joken_9
    ) b 
        on a.nendo = (b.nendo + 1) 
        and a.gyomu_cd = b.gyomu_cd 
        and a.gyoshu_cd = b.gyoshu_cd 
        and a.jigyo_cd = b.jigyo_cd 
        and a.dantai_cd = b.dantai_cd 
        and a.sisetu_cd = b.sisetu_cd join analy_jigyo c 
            on a.nendo = c.nendo 
            and a.gyoshu_cd = c.gyoshu_cd 
            and a.jigyo_cd = c.jigyo_cd;
