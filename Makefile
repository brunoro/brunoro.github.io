ENV_PATH=env
GENERATOR=$(ENV_PATH)/bin/pelican content
SETTINGS=settings.py
URL_PATH=
CREATE_PATH=rm -rf $(URL_PATH); mkdir $(URL_PATH);
SYNC=rsync -avc

all: compile

virtualenv: 
	@sudo pip install virtualenv
	@virtualenv $(ENV_PATH)
deps:
	@env/bin/pip install -r requirements.txt

compile: deps
	LANG=en_US.UTF-8 LC_ALL=en_US.UTF-8 $(GENERATOR) -v -s $(SETTINGS)

clean:
	rm -rf output

devious: compile
	@#ssh brunoro@devio.us "cd ~/public_html/; $(CREATE_PATH)"
	$(SYNC) output/ brunoro@devio.us:~/public_html/$(URL_PATH)

s3: compile
	s3cmd sync --acl-public output/ s3://hitnail.net
