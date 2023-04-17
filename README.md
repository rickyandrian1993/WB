# === Install Local db ===

    1. Install postgresql dengan password postgres
    2. Install dbeaver
    	-> Create dbconnection dengan nama db wb_local
    	-> Kemudian buka sql script masukkan code db yg sudah di buat
    	-> Kemudian cek table di db apakah sudah ke import semua

# === Setting Fingerprint ===

    1. Install jdk java
    2. Install UareUwin300 > SDK > x64 > Setup Application
    3. Install wbf driver > setup > setup64
    4. Go to Device Manager > Biometric Devices > U are U 4500 > Tab Driver > Update Driver > Browse my computer for driver > Let me pick from computer > Pilih U are u 4500 Fingerprint Reader > next
    5. buka cmd > run script > java -jar fingerprint.jar

# === Install NFC Reader ===

1. Buka Advanced Card Reader > ACR122U SDK > SDK > Setup > next till finish

# === Setting Startup exe ===

This tutorial for make automaticly some service run on startup windows
Open win + r
-> shell:startup
-> create file bat kemudian masukan code berikut
-> start javaw -Xmx200m -jar "directory file jar"
Contoh
start javaw -Xmx200m -jar C:\WB\Setup\api-wb-1.0.0.jar
start "" C:\WB\Setup\WBexternal.exe

# === Port Setting ===

This tutorial for check active port to indicator from laptop/pc
win + r > mode
