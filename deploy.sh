#!/bin/bash

# ----------------------
# KUDU Deployment Script
# Version: 1.0.15
# ----------------------

# Helpers
# -------

exitWithMessageOnError () {
  if [ ! $? -eq 0 ]; then
    echo "An error has occurred during web site deployment."
    echo $1
    exit 1
  fi
}

# Prerequisites
# -------------

# Verify node.js installed
hash node 2>/dev/null
exitWithMessageOnError "Missing node.js executable, please install node.js, if already installed make sure it can be reached from current environment."

# Setup
# -----

SCRIPT_DIR="${BASH_SOURCE[0]%\\*}"
SCRIPT_DIR="${SCRIPT_DIR%/*}"
ARTIFACTS=$SCRIPT_DIR/../artifacts
KUDU_SYNC_CMD=${KUDU_SYNC_CMD//\"}

if [[ ! -n "$DEPLOYMENT_SOURCE" ]]; then
  DEPLOYMENT_SOURCE=$SCRIPT_DIR
fi

if [[ ! -n "$NEXT_MANIFEST_PATH" ]]; then
  NEXT_MANIFEST_PATH=$ARTIFACTS/manifest

  if [[ ! -n "$PREVIOUS_MANIFEST_PATH" ]]; then
    PREVIOUS_MANIFEST_PATH=$NEXT_MANIFEST_PATH
  fi
fi

if [[ ! -n "$DEPLOYMENT_TARGET" ]]; then
  DEPLOYMENT_TARGET=$ARTIFACTS/wwwroot
else
  KUDU_SERVICE=true
fi

if [[ ! -n "$KUDU_SYNC_CMD" ]]; then
  # Install kudu sync
  echo Installing Kudu Sync
  npm install kudusync -g --silent
  exitWithMessageOnError "npm failed"

  if [[ ! -n "$KUDU_SERVICE" ]]; then
    # In case we are running locally this is the correct location of kuduSync
    KUDU_SYNC_CMD=kuduSync
  else
    # In case we are running on kudu service this is the correct location of kuduSync
    KUDU_SYNC_CMD=$APPDATA/npm/node_modules/kuduSync/bin/kuduSync
  fi
fi

# Node Helpers
# ------------

selectNodeVersion () {
  if [[ -n "$KUDU_SELECT_NODE_VERSION_CMD" ]]; then
    SELECT_NODE_VERSION="$KUDU_SELECT_NODE_VERSION_CMD \"$DEPLOYMENT_SOURCE\" \"$DEPLOYMENT_TARGET\" \"$DEPLOYMENT_TEMP\""
    eval $SELECT_NODE_VERSION
    exitWithMessageOnError "select node version failed"

    if [[ -e "$DEPLOYMENT_TEMP/__nodeVersion.tmp" ]]; then
      NODE_EXE=`cat "$DEPLOYMENT_TEMP/__nodeVersion.tmp"`
      exitWithMessageOnError "getting node version failed"
    fi
    
    if [[ -e "$DEPLOYMENT_TEMP/__npmVersion.tmp" ]]; then
      NPM_JS_PATH=`cat "$DEPLOYMENT_TEMP/__npmVersion.tmp"`
      exitWithMessageOnError "getting npm version failed"
    fi

    if [[ ! -n "$NODE_EXE" ]]; then
      NODE_EXE=node
    fi

    NPM_CMD="\"$NODE_EXE\" \"$NPM_JS_PATH\""
  else
    NPM_CMD=npm
    NODE_EXE=node
  fi
}

##################################################################################################################################
# Deployment
# ----------

echo ******* Executing node.js deployment. *******


# 1. Select node version
selectNodeVersion

echo =======  [1] Using variables: Starting at `date` =======
echo "BASH_SOURCE = ${BASH_SOURCE}"
echo "SCRIPT_DIR = ${SCRIPT_DIR}"
echo "DEPLOYMENT_SOURCE = ${DEPLOYMENT_SOURCE}"
echo "DEPLOYMENT_TARGET = ${DEPLOYMENT_TARGET}"
echo "DEPLOYMENT_TEMP = ${DEPLOYMENT_TEMP}"
echo "IN_PLACE_DEPLOYMENT = ${IN_PLACE_DEPLOYMENT}"
echo "KUDU_SYNC_CMD = ${KUDU_SYNC_CMD}"
echo "SELECT_NODE_VERSION = ${SELECT_NODE_VERSION}"
echo "NODE_EXE = ${NODE_EXE}"
echo "NPM_CMD = ${NPM_CMD}"
echo "NPM_JS_PATH = ${NPM_JS_PATH}"
echo "NEXT_MANIFEST_PATH = ${NEXT_MANIFEST_PATH}"
echo "PREVIOUS_MANIFEST_PATH = ${PREVIOUS_MANIFEST_PATH}"
echo =======  [1] Using variables: Finished at `date` =======


# 2. Install npm packages
echo =======  [2] Executing npm install: Starting at `date` =======
if [ -e "$DEPLOYMENT_SOURCE/package.json" ]; then
  cd "$DEPLOYMENT_SOURCE"
  eval $NPM_CMD install
  exitWithMessageOnError "npm failed"
  cd - > /dev/null
fi
echo =======  [2] Executing npm install: Finished at `date` =======
echo

# 3. Build ng app
echo =======  [3] Executing npm build: Starting at `date` =======
if [ -e "$DEPLOYMENT_SOURCE/package.json" ]; then
  cd "$DEPLOYMENT_SOURCE"
  #eval ./node_modules/@angular/cli/bin/ng build
  eval $NPM_CMD run build
  exitWithMessageOnError "npm build failed"
  cd - > /dev/null
fi
echo =======  [3] Executing npm build: Finished at `date` =======
echo

# 4. Deploy static files via KuduSync
echo =======  [4] Deploying files: Starting at `date` =======
if [[ "$IN_PLACE_DEPLOYMENT" -ne "1" ]]; then
  "$KUDU_SYNC_CMD" -v 50 -f "$DEPLOYMENT_SOURCE/dist/" -t "$DEPLOYMENT_TARGET" -n "$NEXT_MANIFEST_PATH" -p "$PREVIOUS_MANIFEST_PATH" \
    -i "e2e;node_modules;src;.angular-cli.json;.deployment;.editorconfig;.gitattributes;.gitignore;az.ps1;deploy.sh;karma.conf.js;package.json;protractor.conf.js;README.md;tsconfig.json;tslint.json;yarn.lock"
  exitWithMessageOnError "Kudu Sync failed"
  cd - > /dev/null
fi
echo =======  [4] Deploying files: Finished at `date` =======
echo

##################################################################################################################################
echo "Finished successfully."
