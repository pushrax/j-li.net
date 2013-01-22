LESSC = ./node_modules/less/bin/lessc

compile-assets:
	${LESSC} assets/less/master.less > public/master.css

dev:
	supervisor -q -n exit -w 'assets' -e 'less' -x make compile-assets &
	supervisor -q -n error -i 'public,assets' -e 'js|jade' j-li.js

run: compile-assets
	node j-li.js

prepare: compile-assets
	npm install
	git submodule init
	git submodule update
