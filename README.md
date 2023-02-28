# javascript-lunch

우아한테크코스 레벨1 점심 뭐 먹지 미션

```bash
javascript-lunch
├─ .eslintrc.json
├─ .git
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ main
│  │     │  └─ step1
│  │     └─ remotes
│  │        └─ origin
│  │           └─ main
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-d3d7d5af762184540423de98c4629b0c92ba7b4f.idx
│  │     └─ pack-d3d7d5af762184540423de98c4629b0c92ba7b4f.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ main
│     │  └─ step1
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .prettierrc
├─ .vscode
│  └─ settings.json
├─ README.md
├─ __tests__
│  ├─ render.test.js
│  └─ unit.test.ts
├─ babel.config.js
├─ docs
│  └─ REQUIREMENTS.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ src
│  └─ index.js
├─ templates
│  ├─ add-button.png
│  ├─ category-asian.png
│  ├─ category-chinese.png
│  ├─ category-etc.png
│  ├─ category-japanese.png
│  ├─ category-korean.png
│  ├─ category-western.png
│  ├─ favorite-icon-filled.png
│  ├─ favorite-icon-lined.png
│  ├─ index.html
│  └─ style.css
├─ tsconfig.json
└─ webpack.config.js

```

```
javascript-lunch
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ main
│  │     │  └─ step1
│  │     └─ remotes
│  │        └─ origin
│  │           └─ main
│  ├─ objects
│  │  ├─ 18
│  │  │  └─ c802f38329ec28ebd222603f39f802ccc34f5f
│  │  ├─ 4a
│  │  │  └─ 902ec6c9507cf5c761b921149b10aefc7fed3f
│  │  ├─ 7a
│  │  │  └─ 7db1b1830f9ffc2844274803bffde1221f5a86
│  │  ├─ d8
│  │  │  └─ 0616b55056144ffc3d50ec67c2ef95162bf674
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-d3d7d5af762184540423de98c4629b0c92ba7b4f.idx
│  │     └─ pack-d3d7d5af762184540423de98c4629b0c92ba7b4f.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ main
│     │  └─ step1
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .prettierrc
├─ .vscode
│  └─ settings.json
├─ README.md
├─ __tests__
│  ├─ render.test.js
│  └─ unit.test.ts
├─ babel.config.js
├─ docs
│  └─ REQUIREMENTS.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ src
│  ├─ components
│  │  ├─ Filter
│  │  │  ├─ index.html
│  │  │  └─ index.js
│  │  ├─ Header
│  │  │  ├─ index.html
│  │  │  └─ index.js
│  │  ├─ Modal
│  │  │  └─ AddRestaurantModal
│  │  │     ├─ index.html
│  │  │     └─ index.js
│  │  ├─ Restaurant
│  │  │  ├─ index.html
│  │  │  └─ index.js
│  │  └─ RestaurantList
│  │     ├─ index.html
│  │     └─ index.js
│  ├─ domain
│  ├─ index.js
│  └─ util
├─ templates
│  ├─ add-button.png
│  ├─ category-asian.png
│  ├─ category-chinese.png
│  ├─ category-etc.png
│  ├─ category-japanese.png
│  ├─ category-korean.png
│  ├─ category-western.png
│  ├─ favorite-icon-filled.png
│  ├─ favorite-icon-lined.png
│  ├─ index.html
│  └─ style.css
├─ tsconfig.json
└─ webpack.config.js

```
```
javascript-lunch
├─ .eslintrc.json
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ config
│  ├─ description
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     ├─ heads
│  │     │  ├─ main
│  │     │  └─ step1
│  │     └─ remotes
│  │        └─ origin
│  │           └─ main
│  ├─ objects
│  │  ├─ 18
│  │  │  └─ c802f38329ec28ebd222603f39f802ccc34f5f
│  │  ├─ 4a
│  │  │  └─ 902ec6c9507cf5c761b921149b10aefc7fed3f
│  │  ├─ 7a
│  │  │  └─ 7db1b1830f9ffc2844274803bffde1221f5a86
│  │  ├─ d8
│  │  │  └─ 0616b55056144ffc3d50ec67c2ef95162bf674
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-d3d7d5af762184540423de98c4629b0c92ba7b4f.idx
│  │     └─ pack-d3d7d5af762184540423de98c4629b0c92ba7b4f.pack
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  ├─ main
│     │  └─ step1
│     ├─ remotes
│     │  └─ origin
│     │     └─ main
│     └─ tags
├─ .gitignore
├─ .prettierrc
├─ .vscode
│  └─ settings.json
├─ README.md
├─ __tests__
│  ├─ render.test.js
│  └─ unit.test.ts
├─ babel.config.js
├─ docs
│  └─ REQUIREMENTS.md
├─ index.html
├─ package-lock.json
├─ package.json
├─ src
│  ├─ components
│  │  ├─ Filter
│  │  │  ├─ index.html
│  │  │  └─ index.js
│  │  ├─ Header
│  │  │  ├─ index.html
│  │  │  └─ index.js
│  │  ├─ Modal
│  │  │  └─ AddRestaurantModal
│  │  │     ├─ index.html
│  │  │     └─ index.js
│  │  ├─ Restaurant
│  │  │  ├─ index.html
│  │  │  └─ index.js
│  │  └─ RestaurantList
│  │     ├─ index.html
│  │     └─ index.js
│  ├─ domain
│  ├─ index.js
│  └─ util
├─ templates
│  ├─ add-button.png
│  ├─ category-asian.png
│  ├─ category-chinese.png
│  ├─ category-etc.png
│  ├─ category-japanese.png
│  ├─ category-korean.png
│  ├─ category-western.png
│  ├─ favorite-icon-filled.png
│  ├─ favorite-icon-lined.png
│  ├─ index.html
│  └─ style.css
├─ tsconfig.json
└─ webpack.config.js

```