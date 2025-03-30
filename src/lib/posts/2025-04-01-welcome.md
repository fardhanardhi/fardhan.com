---
title: 'Welcome to My Blog!'
description: 'An introduction to my new blog and what you can expect.'
date: '2025-04-01'
categories:
  - general
published: true
---

<script>
  import Counter from './counter.svelte'
</script>

## Hello and Welcome!

I'm excited to launch my new blog where I'll be sharing my thoughts, experiences, and insights on technology, productivity, and personal growth. Stay tuned for engaging content!

```ts showLineNumbers {2-3} title="coba.ts"
function greet(name: string) {
  console.log(`Hey ${name}! 👋`);
}
```

```bash showLineNumbers
fvm flutter pub global run intl_utils:generate &&
fvm flutter clean &&
fvm flutter pub get &&

afplay '/System/Library/Sounds/Ping.aiff' &&

echo 'Done!'
```

```dart showLineNumbers {2-3,6} title="main.dart"
Future<void> dispose() async {
  /// INFO : Close the db
  for (String key in connections.keys) {
    (await connections[key]!.database).close();
  }
  nearbyChangeStateStream.sink.close();
  nearbyMessageReceivedStream.sink.close();
  nearbyMessageUpdateStream.sink.close();
  ackPrintStream.sink.close();
  pairObjectRabbitStream.sink.close();
  await NearbyHelper.disposeLocalServerService();
  await pushMessagingService.dispose();
}
```

```json showLineNumbers {2-3,10} title="main.json"
{
  "id_cabang": "690062",
  "cabang_name": "Klenik",
  "cabang_email": "nur.alifah@majoo.id",
  "cabang_address": null,
  "cabang_notlp": null,
  "cabang_kota": null,
  "cabang_provinsi": null,
  "cabang_negara": null,
  "cabang_denah_meja": null,
  "cabang_pajak": null,
  "cabang_service_charge": null,
  "cabang_header_struk": null,
  "cabang_footer_struk": null,
  "cabang_logo_path": null,
  "cabang_pajak_method": "0",
  "cabang_jenis_outlet": "Penjualan",
  "cabang_longitude": null,
  "cabang_latitude": null,
  "cabang_postal_code": null,
  "supervisor_name": null,
  "cabang_usaha_name": null,
  "kota": null,
  "provinsi_name": null,
  "negara_name": null,
  "active_status": "1",
  "id_kota": null,
  "id_provinsi": null,
  "id_negara": null,
  "cabang_is_primary": "0",
  "id_m_cabang_has_m_media_sosial": null,
  "M_Media_Sosial_id_media_sosial": null,
  "link": "",
  "id_support_transactions": "1305466",
  "support_name": "PRIME+",
  "support_url_alias": "PRIMEPLUS",
  "customer_id": null,
  "lifecycle_status": "active",
  "weborder_number": "",
  "media_sosial": [],
  "status_addon": true
}
```

![alt text](/favicon.png)

<Counter />
