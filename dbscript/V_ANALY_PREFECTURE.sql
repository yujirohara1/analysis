drop view V_ANALY_PREFECTURE; 

create 
or replace view V_ANALY_PREFECTURE as 
select
    nendo,
    substr(a.dantai_cd, 1, 2) pref_cd,
    count(1) kensu,
    b.nm pref_nm
from
    analy_main a,
    (select '01' cd   ,   '北海道'     nm union all 
     select '02' cd   ,   '青森県'     nm union all 
     select '03' cd   ,   '岩手県'     nm union all 
     select '04' cd   ,   '宮城県'     nm union all 
     select '05' cd   ,   '秋田県'     nm union all 
     select '06' cd   ,   '山形県'     nm union all 
     select '07' cd   ,   '福島県'     nm union all 
     select '08' cd   ,   '茨城県'     nm union all 
     select '09' cd   ,   '栃木県'     nm union all 
     select '10' cd   ,   '群馬県'     nm union all 
     select '11' cd   ,   '埼玉県'     nm union all 
     select '12' cd   ,   '千葉県'     nm union all 
     select '13' cd   ,   '東京都'     nm union all 
     select '14' cd   ,   '神奈川県'   nm union all 
     select '15' cd   ,   '新潟県'     nm union all 
     select '16' cd   ,   '富山県'     nm union all 
     select '17' cd   ,   '石川県'     nm union all 
     select '18' cd   ,   '福井県'     nm union all 
     select '19' cd   ,   '山梨県'     nm union all 
     select '20' cd   ,   '長野県'     nm union all 
     select '21' cd   ,   '岐阜県'     nm union all 
     select '22' cd   ,   '静岡県'     nm union all 
     select '23' cd   ,   '愛知県'     nm union all 
     select '24' cd   ,   '三重県'     nm union all 
     select '25' cd   ,   '滋賀県'     nm union all 
     select '26' cd   ,   '京都府'     nm union all 
     select '27' cd   ,   '大阪府'     nm union all 
     select '28' cd   ,   '兵庫県'     nm union all 
     select '29' cd   ,   '奈良県'     nm union all 
     select '30' cd   ,   '和歌山県'   nm union all 
     select '31' cd   ,   '鳥取県'     nm union all 
     select '32' cd   ,   '島根県'     nm union all 
     select '33' cd   ,   '岡山県'     nm union all 
     select '34' cd   ,   '広島県'     nm union all 
     select '35' cd   ,   '山口県'     nm union all 
     select '36' cd   ,   '徳島県'     nm union all 
     select '37' cd   ,   '香川県'     nm union all 
     select '38' cd   ,   '愛媛県'     nm union all 
     select '39' cd   ,   '高知県'     nm union all 
     select '40' cd   ,   '福岡県'     nm union all 
     select '41' cd   ,   '佐賀県'     nm union all 
     select '42' cd   ,   '長崎県'     nm union all 
     select '43' cd   ,   '熊本県'     nm union all 
     select '44' cd   ,   '大分県'     nm union all 
     select '45' cd   ,   '宮崎県'     nm union all 
     select '46' cd   ,   '鹿児島県'   nm union all 
     select '47' cd   ,   '沖縄県'     nm union all 
     select '99' cd   ,   'dummy'      nm
    ) b
where
    a.hyo_num = 20
and a.gyo_num = 1
and a.retu_num = 1
and substr(a.dantai_cd, 1, 2) = b.cd
group by
    nendo,
    substr(a.dantai_cd, 1, 2),
    b.nm 
order by
    nendo,
    substr(a.dantai_cd, 1, 2)
;

select * from V_ANALY_PREFECTURE where nendo = 2020 ;



