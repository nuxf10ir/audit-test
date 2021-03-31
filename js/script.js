_.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

jQuery.fn.cardGame = function(data) {
    var $self = $(this),
        questionsData = data.questionsData,
        answersData = data.answersData,
        $card = $("#card", $self),
        $front = $("#card-front", $card),
        $back = $("#card-back", $card),
        questionTmpl = _.template($("#question__tmpl").html()),
        answerTmpl = _.template($("#answer__tmpl").html()),
        flipDirection = true,
        score = 0;

    questionTmpl = _.template($("#question__tmpl").html()),
        answerTmpl = _.template($("#answer__tmpl").html()),
        finishTmpl = _.template($("#finish__tmpl").html());

    $card.flip({
        trigger: 'manual',
        axis: 'y'
    });

    $card.on("click.cardGame", ".js-to-question", function(e) {
        var $this = $(e.currentTarget),
            questionId = $this.data("question");

        if (questionId === -1) {
            var result, comment;
            if (score >= 10) {
                result = "Браво! Вы&nbsp;блестяще справились и&nbsp;в&nbsp;этот раз аудит точно пройдет без неприятных сюрпризов.";
                comment = "Вы&nbsp;готовы к&nbsp;финальному тесту, пройдите его, чтобы закрепить полученные знания и&nbsp;получить сертификат.";
            } else if (score >= 7 && score < 10 ) {
                result = "Отлично! Эффективность подготовки составила 80%. Это хороший результат, но&nbsp;нет предела совершенству.";
                comment = "Вы&nbsp;можете перейти к&nbsp;финальному тесту, либо попробовать пройти квест по&nbsp;подготовке к&nbsp;проверке еще раз, чтобы добиться лучшего результата.";
            } else {
                result = "Вы&nbsp;справились! Однако, эффективность подготовки составила всего&nbsp;50%.";
                comment = "Вы&nbsp;можете перейти к&nbsp;финальному тесту, либо попробовать пройти квест по&nbsp;подготовке к&nbsp;проверке еще раз, чтобы добиться лучшего результата.";
            }
            $front.html(finishTmpl({score, result, comment}));
            score = 0;
        } else {
            $front.html(questionTmpl(_.extend(questionsData[questionId], {id: questionId})));
        }


        $card.flip(false);

    });

    $card.on("click.cardGame", ".js-to-answer", function(e) {
        var $this = $(e.currentTarget),
            questionId = $this.data("question");
        answerId = $this.data("answer");
        score += parseInt($this.data("score"), 10);

        $back.html(answerTmpl(answersData[questionId][answerId]));
        $card.flip(true);
    });

    return {
        init: function () {
            setTimeout(function () {
                $card.flip(flipDirection);
            }, 1000);
        }
    }
};

$("#cardgame").cardGame(gameData).init();






