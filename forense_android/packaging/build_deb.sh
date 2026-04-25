#!/bin/bash
# Script de construcción del paquete .deb para forense-android
set -e

PKG_NAME="forense-android"
VERSION="1.0.0"
ARCH="amd64"
DEST="dist/${PKG_NAME}_${VERSION}_${ARCH}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🔨 Construyendo paquete ${PKG_NAME} v${VERSION}..."

# Limpiar destino anterior
rm -rf "$DEST"
mkdir -p "$DEST/DEBIAN"
mkdir -p "$DEST/usr/share/${PKG_NAME}"
mkdir -p "$DEST/usr/bin"
mkdir -p "$DEST/usr/share/applications"

# Copiar archivos de la aplicación
echo "📦 Copiando archivos de la aplicación..."
cp -r "$PROJECT_ROOT/"*.py "$DEST/usr/share/${PKG_NAME}/" 2>/dev/null || true
cp -r "$PROJECT_ROOT/database" "$DEST/usr/share/${PKG_NAME}/"
cp -r "$PROJECT_ROOT/ui" "$DEST/usr/share/${PKG_NAME}/"
cp -r "$PROJECT_ROOT/services" "$DEST/usr/share/${PKG_NAME}/"
cp -r "$PROJECT_ROOT/models" "$DEST/usr/share/${PKG_NAME}/"
cp -r "$PROJECT_ROOT/assets" "$DEST/usr/share/${PKG_NAME}/"
cp "$PROJECT_ROOT/requirements.txt" "$DEST/usr/share/${PKG_NAME}/"

# Crear script lanzador
cat > "$DEST/usr/share/${PKG_NAME}/launcher.sh" << 'LAUNCHER'
#!/bin/bash
cd /usr/share/forense-android
export PYTHONPATH=/usr/share/forense-android:$PYTHONPATH
python3 main.py "$@"
LAUNCHER
chmod +x "$DEST/usr/share/${PKG_NAME}/launcher.sh"

# Wrapper ejecutable en /usr/bin
cat > "$DEST/usr/bin/forense-android" << 'WRAPPER'
#!/bin/bash
exec /usr/share/forense-android/launcher.sh "$@"
WRAPPER
chmod +x "$DEST/usr/bin/forense-android"

# .desktop entry
cat > "$DEST/usr/share/applications/forense-android.desktop" << 'DESKTOP'
[Desktop Entry]
Name=Sistema Forense Android
Comment=Gestión del procedimiento forense informático de dispositivos Android
Exec=forense-android
Icon=/usr/share/forense-android/assets/logo.png
Terminal=false
Type=Application
Categories=Science;Utility;Security;
Keywords=forense;android;custodia;cadena;pericial;
DESKTOP

# Copiar scripts DEBIAN
echo "📋 Copiando scripts de empaquetado..."
cp "$SCRIPT_DIR/DEBIAN/control" "$DEST/DEBIAN/"
cp "$SCRIPT_DIR/DEBIAN/postinst" "$DEST/DEBIAN/"
cp "$SCRIPT_DIR/DEBIAN/prerm" "$DEST/DEBIAN/"
chmod 755 "$DEST/DEBIAN/postinst" "$DEST/DEBIAN/prerm"

# Construir el paquete .deb
echo "🏗️  Generando paquete .deb..."
cd "$(dirname "$DEST")"
dpkg-deb --build --root-owner-group "$(basename "$DEST")"

echo ""
echo "✅ Paquete generado exitosamente:"
echo "   $(realpath ${DEST}.deb)"
echo ""
echo "📦 Para instalar: sudo dpkg -i ${PKG_NAME}_${VERSION}_${ARCH}.deb"
