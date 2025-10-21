@echo off
setlocal enabledelayedexpansion

echo ==================================================
echo   🔍 VERIFICA AUTOMATICA DASHBOARD CONDOMINIO
echo ==================================================
echo.

set DASH_DIR=dashboards
set JS_FILE=js\dashboard.js

:: Verifica esistenza file JS
if exist "%JS_FILE%" (
  echo ✅ Trovato: %JS_FILE%
) else (
  echo ❌ Manca il file: %JS_FILE%
)

echo.

:: Controlla ogni dashboard HTML
for %%F in (
  "%DASH_DIR%\dashboard-condomino.html"
  "%DASH_DIR%\dashboard-admin-condominio.html"
  "%DASH_DIR%\dashboard-admin-sito.html"
) do (
  if exist %%F (
    echo --------------------------------------------
    echo Verifico %%F
    echo --------------------------------------------
    findstr /C:"<script src=\"../js/dashboard.js\">" %%F >nul
    if errorlevel 1 (
      echo ⚠️  Manca il collegamento a ../js/dashboard.js
    ) else (
      echo ✅ Collegamento corretto a dashboard.js
    )
  ) else (
    echo ❌ File mancante: %%F
  )
  echo.
)

echo --------------------------------------------------
echo ✅ Test completato.
echo Premi un tasto per chiudere.
pause >nul
