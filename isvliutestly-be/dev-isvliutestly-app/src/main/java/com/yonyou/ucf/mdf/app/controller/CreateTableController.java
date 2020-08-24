package com.yonyou.ucf.mdf.app.controller;


import com.yonyou.iuap.context.InvocationInfoProxy;
import com.yonyou.ucf.mdd.conf.DataSourceFactory;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping(value = "/tenant")
public class CreateTableController {

    private final DataSource dataSource = DataSourceFactory.get(DataSourceFactory.dsPerfix + DataSourceFactory.bizDS);

    @PostMapping(value = "/createTable")
    public Object init(@RequestBody Map<String, Object> params) {
        String tenantId = (String) params.get("tenantId");
        String sql = (String) params.get("sql");
        log.info("租户信息 tenantId：" + tenantId + ", 建表语句sql: " + sql);

        Connection connection = null;
        PreparedStatement executor = null;
        try {
            // 设置租户ID的上下文
            InvocationInfoProxy.setTenantid(tenantId);
            // 执行建表
            connection = DataSourceUtils.getConnection(dataSource);
            executor = connection.prepareStatement(sql);
            executor.execute();

            Map<String, Object> result = new HashMap<>();
            result.put("status", 1);
            result.put("msg", "建表成功");
            return result;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            Map<String, Object> result = new HashMap<>();
            result.put("status", 0);
            result.put("msg", "建表失败");
            return result;
        } finally {
            if (executor != null) {
                try {
                    executor.close();
                } catch (SQLException e) {
                    log.error("exception when try to close prepare statement in finally block", e);
                }
            }
            // 归还数据库连接
            DataSourceUtils.releaseConnection(connection, dataSource);
        }
    }
}
