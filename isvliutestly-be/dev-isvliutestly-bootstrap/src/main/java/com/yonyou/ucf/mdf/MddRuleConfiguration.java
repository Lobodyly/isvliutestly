package com.yonyou.ucf.mdf;

import com.yonyou.ucf.mdd.rules.*;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * 本类主要用于
 *
 * @author liuhaoi
 * @since Created At 2020/6/9 10:50 上午
 */
@Configuration
public class MddRuleConfiguration {

    @Bean
    @ConditionalOnMissingBean
    public MddDeleteRule mddDeleteRule() {
        return new MddDeleteRule();
    }

    @Bean
    @ConditionalOnMissingBean
    public MddCheckUniqueRule mddCheckUniqueRule() {
        return new MddCheckUniqueRule();
    }

    @Bean
    @ConditionalOnMissingBean
    public MddDetailRule mddDetailRule() {
        return new MddDetailRule();
    }

    @Bean
    @ConditionalOnMissingBean
    public MddMovePrevRule mddMovePrevRule() {
        return new MddMovePrevRule();
    }

    @Bean
    @ConditionalOnMissingBean
    public MddMoveFirstRule mddMoveFirstRule() {
        return new MddMoveFirstRule();
    }

    @Bean
    @ConditionalOnMissingBean
    public MddMoveLastRule mddMoveLastRule() {
        return new MddMoveLastRule();
    }

    @Bean
    @ConditionalOnMissingBean
    public MddMoveNextRule mddMoveNextRule() {
        return new MddMoveNextRule();
    }




}
