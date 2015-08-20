GENERATOR=pelican content
SETTINGS=settings.py
URL_PATH=
CREATE_PATH=rm -rf $(URL_PATH); mkdir $(URL_PATH);
SYNC=rsync -avc

all: compile

deps:
	@pip install markdown
	@pip install pelican

compile: deps
	LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 $(GENERATOR) -v -s $(SETTINGS)

clean:
	rm -rf output

alwaysdata: compile
	@#ssh gbrunoro@ssh.alwaysdata.com "cd ~/www/; $(CREATE_PATH)"
	$(SYNC) output/ gbrunoro@ssh.alwaysdata.com:~/www/$(URL_PATH)

devious: compile
	@#ssh brunoro@devio.us "cd ~/public_html/; $(CREATE_PATH)"
	$(SYNC) output/ brunoro@devio.us:~/public_html/$(URL_PATH)

dcc: compile
	@#ssh brunoro@login.dcc.ufmg.br "cd /www/users/grad/ccomp/09/brunoro/public_html/; $(CREATE_PATH)"
	$(SYNC) output/ brunoro@login.dcc.ufmg.br:/www/users/grad/ccomp/09/brunoro/public_html/$(URL_PATH)

s3: compile
	s3cmd sync --acl-public output/ s3://machine-burning/$(URL_PATH)/
