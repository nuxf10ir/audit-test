_.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

jQuery.fn.cardGame = function(data) {
    var $self = $(this),
        questionsData = data.questionsData,
        $card = $("#card", $self),
        $front = $("#card-front", $card),
        $back = $("#card-back", $card),
        questionTmpl = _.template($("#question__tmpl").html()),
        answerTmpl = _.template($("#answer__tmpl").html()),
        flipDirection = true,
        answers = new Array(6);

    $card.flip({
        trigger: 'manual',
        axis: 'y'
    });

    $card.on("click.cardGame", ".js-to-question, .js-to-answer", function(e) {
        var $this = $(e.currentTarget),
            questionId = $this.data("question"),
            answerIndex = $this.data("answerIndex"),
            answerValue= $this.data("answerValue"),
            $side = flipDirection ? $front : $back;

        flipDirection = !flipDirection;
        if (answerIndex != null) {
            answers[answerIndex] = answerValue;
        }
        if (questionId <= 11) {
            $side.html(questionTmpl(_.extend(questionsData[questionId], {id: questionId})));
        } else {
            var count = _.reduce(answers, function(memo, num){ return memo + num; }, 0);
            var text = "";
            switch (true) {
                case count >= 50:
                    text = 'По&nbsp;мнению инспекции Ваша компания&nbsp;&mdash; &laquo;Выгодоприобетатель&raquo;. Ее&nbsp;точно не&nbsp;признают &laquo;техничкой&raquo;.';
                    break;
                case count >= 20:
                    text = 'Статус компании по&nbsp;бальной системе инспекции&nbsp;&mdash; предполагаемый &laquo;выгодоприобретатель&raquo;. Вполне возможно инспекторы продолжат собирать инормацию, в&nbsp;том числе по&nbsp;связанным с&nbsp;компанией юрлицам, чтобы убедиться что она точно не&nbsp;выполняет &laquo;техническую&raquo; роль.';
                    break;
                default:
                    text = 'Согласно внутреннему регламенту налоговой компания отвечает признакам &laquo;Технического звена&raquo;. Безопаснее будет поработать над статусом компании. <br/>Исправить положение помогут критерии, которые вшиты в&nbsp;алгоритм этого калькулятора. Их&nbsp;можно скачать выше калькулятора в&nbsp;мобильной версии журнала, и&nbsp;справа на&nbsp;полях, если читаете статью с&nbsp;компьютера.';
                    break;

            }
            var tmplData = {
                count: count,
                text: text
            };
            $side.html(answerTmpl(tmplData));
        }
        $card.flip(flipDirection);
    });
    return {
        init: function () {
            setTimeout(function () {
                $card.flip(flipDirection);
            }, 1000);
        }
    }
};

$("#cardgame").cardGame(data).init();






