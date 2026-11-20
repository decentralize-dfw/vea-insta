# VEA · Daily comments

Virtually Ever After için tarihli Instagram yorum taslağı arşivi.

- [20 Kasım 2026 kaydı](days/2026-11-20.md)
- [Web viewer](https://virtuallyeverafter.work/comments/)
- Viewer: `index.html`; gün bağlantısı `?date=YYYY-MM-DD`.
- Her kayıtta tıklanabilir Instagram bağlantısı, İngilizce yorum ve VEA uyum gerekçesi bulunur.
- Kaynaklar: bilinen takip hesapları, ayrı 100 niş hesabı ve onaylı hashtagler.
- Hedef: her gün en az 20 uygun taslak; en az 5'i gerçek hashtag keşfinden. Eksikler açıkça kaydedilir.

Instagram’a yorum gönderilmez. Bu depo yalnız araştırma çıktısı ve taslakları saklar.

## Günlük güncelleme

Mevcut Codex otomasyonu her gün Europe/Paris 18.00 için ayarlıdır. Araştırma kullanıcı bilgisayarındaki oturumla yürütülür; bu statik viewer kendi başına Instagram taramaz. Otomasyonun çalışabilmesi için Codex ve gerekli oturum erişimi kullanılabilir olmalıdır.

Araştırma ve editoryal denetim tamamlandığında yerel `instagram-review/runs/YYYY-MM-DD/full-review-approved.json` ve `full-review-coverage.json` dosyaları içe aktarılır:

```sh
node scripts/import-day.mjs YYYY-MM-DD /absolute/path/to/instagram-review
```

İçe aktarma yalnız belirtilen günü günceller; diğer günleri korur. Aynı girdinin yeniden içe aktarımı aynı sonucu verir. Kayıt tarihi, araştırmanın gerçek Europe/Paris günüdür; eski taslaklar yeni güne kopyalanmaz. Eksik araştırma tamamlanmış olarak etiketlenmez.

Günlük aktarımda `data/archive.json` ve ilgili `days/YYYY-MM-DD.md` birlikte commit edilir ve `main` dalına gönderilir. Yayın/yazma hatası olursa başarılı gönderim bildirilmez. Yetkilendirme bilgileri veya tarayıcı oturumları depoya konulmaz.

## Yorum yaklaşımı

İngilizce, emojisiz, düzgün noktalama; doğal edilgen anlatım ve ölçülü mesleki takdir. Kişisel beğeni, “we”, genel övgü veya yalnız görüntü betimlemesi kullanılmaz.

Farklı işlerden oluşan carousellerde bütün seçkinin atmosferi ve yaklaşımı değerlendirilir. Aynı ürünün farklı açıları veya ilişkili varyasyonlarında ortak tasarım dili, gözlenen farklar ve bunların etkisi değerlendirilir. Her slayt ve videonun tamamı incelenmeden taslak onaylanmaz.

## Viewer

Bağımlılık veya build gerektirmeyen statik HTML/CSS/JavaScript. GitHub Pages için `main` dalının kök dizini kullanılabilir. Yerelde bir HTTP sunucusuyla açılmalıdır; doğrudan `file://` ile JSON yüklenmeyebilir.

Mevcut VEA sitesindeki `/comments/` viewer'ı bu deponun `main/data/archive.json` dosyasını doğrudan okur. Günlük veri güncellemeleri için ana siteyi tekrar yayımlamak gerekmez. Viewer kaynaklarında değişiklik yapılırsa ana site deposundaki `comments/` kopyası da güncellenmelidir. GitHub önbelleği nedeniyle yeni verinin görünmesi birkaç dakika sürebilir.
