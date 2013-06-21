GENERATOR=pelican
SETTINGS=settings.py
DEST_PATH=.

all: compile
compile: 
	$(GENERATOR) -s $(SETTINGS) $(DEST_PATH)
clean:
	rm -rf output

alwaysdata:: compile
	ssh gbrunoro@ssh.alwaysdata.com "rm -rf ~/www/log"
	scp -r output gbrunoro@ssh.alwaysdata.com:~/www/log

devious: compile
	ssh brunoro@devio.us "rm -rf ~/public_html/log"
	scp -r output brunoro@devio.us:~/public_html/log

dcc: compile
	ssh brunoro@login.dcc.ufmg.br "rm -rf /www/users/grad/ccomp/09/public_html/log"
	scp -r output brunoro@login.dcc.ufmg.br:/www/users/grad/ccomp/09/public_html/log
